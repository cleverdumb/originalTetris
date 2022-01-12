class StickBlock {
    constructor(x,y) {
        this.coreX = x;
        this.coreY = y;
        this.remainingTime = 2000;
        this.rot = 1;
        this.id = 5;
        this.rotations = [
            [
                {
                    isCore:false,
                    ox:0,
                    oy:-1
                },
                {
                    isCore:true,
                    ox:0,
                    oy:0
                },
                {
                    isCore:false,
                    ox:0,
                    oy:1
                },
                {
                    isCore:false,
                    ox:0,
                    oy:2
                }
            ],
            [
                {
                    isCore:false,
                    ox:-1,
                    oy:0
                },
                {
                    isCore:true,
                    ox:0,
                    oy:0
                },
                {
                    isCore:false,
                    ox:1,
                    oy:0
                },
                {
                    isCore:false,
                    ox:2,
                    oy:0
                }
            ],
            [
                {
                    isCore:false,
                    ox:0,
                    oy:-1
                },
                {
                    isCore:true,
                    ox:0,
                    oy:0
                },
                {
                    isCore:false,
                    ox:0,
                    oy:1
                },
                {
                    isCore:false,
                    ox:0,
                    oy:2
                }
            ],
            [
                {
                    isCore:false,
                    ox:-1,
                    oy:0
                },
                {
                    isCore:true,
                    ox:0,
                    oy:0
                },
                {
                    isCore:false,
                    ox:1,
                    oy:0
                },
                {
                    isCore:false,
                    ox:2,
                    oy:0
                }
            ]
        ]
    }
    rotate() {
        let gridDup = game.grid;
        this.rot++;
        this.rot%=this.rotations.length;
        if (!this.rotations[this.rot].every(x=>{
            if (this.coreX+x.ox>=0&&this.coreX+x.ox<=9&&this.coreY+x.oy>=0&&this.coreY+x.oy<=19&&(gridDup[this.coreY+x.oy][this.coreX+x.ox]==0||gridDup[this.coreY+x.oy][this.coreX+x.ox]==1)) {
                return true;
            }
            else {
                return false;
            }
        })) {
            this.rot--;
            this.rot+=this.rotations.length;
            this.rot%=this.rotations.length;
        }
        console.log(this.rot);
    }
    move(dx,dy) {
        if (this.rotations[this.rot].every(x=>{
            if (game.grid[this.coreY+x.oy+dy]&&game.grid[this.coreY+x.oy+dy]&&(game.grid[this.coreY+x.oy+dy][this.coreX+x.ox+dx]==0||game.grid[this.coreY+x.oy+dy][this.coreX+x.ox+dx]==1)) {
                return true;
            }
        })) {
            this.coreX += dx;
            this.coreY += dy;
        }
    }
    draw() {
        this.rotations[this.rot].forEach(y=>{
            game.grid[this.coreY+y.oy][this.coreX+y.ox] = 1;
        })
    }
    touch() {
        if (this.remainingTime>0) {
            this.remainingTime-=10;
        }
        else if (this.remainingTime == 0) {
            this.rotations[this.rot].forEach(x=>{
                game.grid[this.coreY+x.oy][this.coreX+x.ox] = 2;
            })
            game.newBlock();
        }
    }
    checkTouch() {
        this.rotations[this.rot].forEach(x=>{
            if ((this.coreY+x.oy+1>19)||game.grid[this.coreY+x.oy+1][this.coreX+x.ox]==undefined||game.grid[this.coreY+x.oy+1][this.coreX+x.ox]==2) {
                this.touch();
            }
        })
    }
    hardDrop() {
        this.remainingTime = 0;
        for (let a=0; a<20; a++) {
            this.move(0,1);
        }
    }
}