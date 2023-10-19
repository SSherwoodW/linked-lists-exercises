/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/** LinkedList: chained together nodes. */

class LinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }

    /** push(val): add new value to end of list. */

    push(val) {
        let newNode = new Node(val);

        if (this.head === null && this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    /** unshift(val): add new value to start of list. */

    unshift(val) {
        let newNode = new Node(val);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
    }

    /** pop(): return & remove last item. */

    pop() {
        if (!this.head) {
            throw new Error("Nothing to remove.");
        }

        // check if list is only a single item; remove.
        if (this.head === this.tail) {
            const value = this.head.val;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return value;
        }

        // if list is more than one item, find the second to last.
        let currentNode = this.head;
        while (currentNode.next !== this.tail) {
            currentNode = currentNode.next;
        }

        // get last node from list, remove, return that value.
        const value = this.tail.val;
        this.tail = currentNode;
        this.tail.next = null;
        this.length--;
        return value;
    }

    /** shift(): return & remove first item. */

    shift() {
        if (!this.head) {
            throw new Error("Nothing to remove.");
        }

        // check if list is only a single item; remove.
        if (this.head === this.tail) {
            const value = this.head.val;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return value;
        }

        // get first node from list, remove, return its value.
        const value = this.head.val;
        this.head = this.head.next;
        this.length--;
        return value;
    }

    /** getAt(idx): get val at idx. */

    getAt(idx) {
        if (idx < 0 || idx >= this.length) throw new Error("Invalid index.");

        let currentNode = this.head;
        if (idx === 0) {
            return currentNode.val;
        }

        for (let i = 0; i < idx; i++) {
            currentNode = currentNode.next;
        }
        return currentNode.val;
    }

    /** setAt(idx, val): set val at idx to val */

    setAt(idx, val) {
        if (idx < 0 || idx >= this.length) throw new Error("Invalid index.");

        let currentNode = this.head;
        for (let i = 0; i < idx; i++) {
            currentNode = currentNode.next;
        }

        currentNode.val = val;
        return val;
    }

    /** insertAt(idx, val): add node w/val before idx. */

    insertAt(idx, val) {
        if (idx < 0 || idx > this.length) throw new Error("Invalid index.");

        let newNode = new Node(val);

        // if list is empty...
        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        }

        // if index is zero...
        if (idx === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            // if index greater than zero...
            let currentNode = this.head;
            for (let i = 0; i < idx - 1; i++) {
                currentNode = currentNode.next;
            }
            newNode.next = currentNode.next;
            currentNode.next = newNode;
            if (idx === this.length) {
                this.tail = newNode;
            }
        }
        this.length++;
    }

    /** removeAt(idx): return & remove item at idx, */

    removeAt(idx) {
        if (idx < 0 || idx >= this.length) throw new Error("Invalid index.");

        // if idx is at start of list...
        if (idx === 0) {
            const value = this.head.val;
            // if list is longer than 1 node...
            if (this.length > 1) {
                this.head = this.head.next;
            } else {
                // if list is only 1 node...
                this.head = null;
                this.tail = null;
            }
            this.length--;
            return value;
        }

        // identify node at idx greater than 0 in lists longer than 1 node
        let currentNode = this.head;
        let prevNode;
        for (let i = 0; i < idx; i++) {
            prevNode = currentNode;
            currentNode = currentNode.next;
        }

        // remove and return value at idx
        const value = currentNode.val;
        // if idx is at end of list, update tail...
        if (currentNode.next === null) {
            this.tail = prevNode;
        } else {
            prevNode.next = currentNode.next;
        }
        this.length--;
        return value;
    }

    /** average(): return an average of all values in the list */

    average() {
        if (this.length === 0) return 0;

        let total = 0;
        let currentNode = this.head;
        while (currentNode.next !== null) {
            total += currentNode.val;
            currentNode = currentNode.next;
        }
        total += this.tail.val;

        return total / this.length;
    }
}

module.exports = LinkedList;
