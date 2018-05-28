class Tree {
    constructor () {
        this.branches = new Array();
    }

    addBranch(branch) {
        this.branches.push(branch);
    }

    show() {
        for(let i = 0; i < this.branches.length; i++) {
            this.branches[i].show();
        }
    }
}