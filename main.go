package main

import (
    "flag"
    "fmt"
    "log"
    "math/bits"
    "sync"
    "time"
)

type solutions struct {
	count uint64
	sync.Mutex
	found <-chan struct{}
}
type Board struct {
	size      uint64
	solutions *solutions
	row       *Row
	wg        sync.WaitGroup
}

type Row struct {
	column    uint64
	columns   uint64
	depth     uint64
	major     uint64
	minor     uint64
	parent    *Row
	single    bool
	size      uint64
	solutions chan<- struct{}
	solved    bool
	wg        sync.WaitGroup
	sync.Mutex
}

func NewBoard(s uint64, single bool) *Board {
	solChan := make(chan struct{}, 1000) // 25 is a guess but we'll be limited to the number of concurrently running gofuncs
	sol := &solutions{found: solChan}
	r := &Row{
		parent:    &Row{},
		solutions: solChan,
		single:    single,
		size:      s,
	}
	return &Board{
		row:       r,
		size:      s,
		solutions: sol,
	}
}

func (b *Board) run() time.Duration {

	b.wg.Add(1)
	go b.solutions.collect(&b.wg)

	b.wg.Add(1)
    start := time.Now()

    go b.start(&b.wg)
	b.wg.Wait()

    return time.Now().Sub(start)

}

func (s *solutions) collect(wg *sync.WaitGroup) {
	defer wg.Done()
	for range s.found {
		s.Lock()
		s.count++
		s.Unlock()
	}
	log.Println("done collection solutions")
}

func NewRowFromRow(column uint64, parent *Row) *Row {
	r := &Row{
		depth:     parent.depth + 1,
		size:      parent.size,
		solutions: parent.solutions,
		column:    column,
		parent:    parent,
		single:    parent.single,
	}
	newColumn := uint64(1<<column)

    c := newColumn | parent.columns
    if c > 1<<parent.size {
        c = c - 1<<parent.size
    }
    r.columns = c

	r.minor = (newColumn | parent.minor) >> 1

    var maj uint64
    if column<<1 < 1<<parent.size {
        maj = column << 1
    }
    if parent.major<<1 > 1<<parent.size {
        maj = maj | (parent.major<<1 - 1<<parent.size)
    } else {
        maj = maj | (parent.major << 1)
    }
	r.major = maj

	return r
}

func (b *Board) start(wg *sync.WaitGroup) {
	defer wg.Done()
	var runWG sync.WaitGroup
	for i := uint64(0); i < b.size; i++ {
        runWG.Add(1)
        row := NewRowFromRow(i, b.row)
        go row.placeQueen(&runWG)
    }
	runWG.Wait()
	log.Printf("done, closing solutions...")
	close(b.row.solutions)
}

func (r *Row) placeQueen(wg *sync.WaitGroup) {
	defer wg.Done()

	// If our depth exceeds the size the last placement was a solution. Signal a solution was found and return.
	if r.depth >= r.size {
		r.solutions <- struct{}{}

		// Part 1 if we only one a single solution start short circuit here.
		if r.single {
			r.parent.solved = true
			return
		}
	}

	var column, i uint64
	for column = r.columns | r.minor | r.major; i < r.size; column = column >> 1 {
		if bits.TrailingZeros64(column) > 0 {
			nextRow := NewRowFromRow(i, r)
			r.wg.Add(1)
			nextRow.placeQueen(&r.wg)
		}

		if r.single && r.solved {
		    // Second part of the short circuit, so we unwind from where we are and exit.
			r.parent.solved = true
			return
		}
		i++
	}
	r.wg.Wait()
}


func main() {

	var boardSize *uint64
	var single *bool
	boardSize = flag.Uint64("s", 0, "size of the board")
	single = flag.Bool("o", false, "time to one solution only")
	flag.Parse()
	if *boardSize == uint64(0) {
		fmt.Println("A board size of 0 would yield a solutions of 0. DUH!")
		return
	}

	b := NewBoard(*boardSize, *single)
	fmt.Printf("Calculating a board size of: %d\n", b.size)

	runTime := b.run()
	fmt.Printf("Solutions: %d, in %f seconds\n", b.solutions.count, runTime.Seconds())
}
