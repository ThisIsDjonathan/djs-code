class Tree {
    constructor () {
        this.branches = new Array();
    }

    /**
     * Add a single branch to the tree.
     * @param branch to be added.
     */
    addBranch(branch) {
        if(!branch.growned) {
           // branch.growned = true;
            this.branches.push(branch);
        }
    }

    /**
     * Add a list of branches to the tree.
     * @param array of branches  
     */
    addBranches(branches) {
        for(let i = 0; i < branches.length; i++) { 
            if(!branches[i].growned) {
                branches[i].growned = true;
                this.branches.push(branches[i]);
            }
        }
    }

    /**
     * Show all branches on the tree that are not growned yet.
     */
    show() {
        for(let i = 0; i < this.branches.length; i++)
            this.branches[i].show();
    }
}