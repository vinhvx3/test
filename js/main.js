document.onkeydown = function(event) {
    switch (event.keyCode) {
        case 37:
            //console.log('Left key pressed');
            app.left();
            break;
        case 38:
            //console.log('Up key pressed');
            app.up();
            break;
        case 39:
            //console.log('Right key pressed');
            app.right();
            break;
        case 40:
            //console.log('Down key pressed');
            app.down();
            break;
        case 13:
            //console.log('Enter key pressed');
            app.enter();
            break;
    }
};

var app = new Vue({
    el: '#app',
    data: {
        rightPercent: 0,
        items: [],
        arrSelect: [],
        currentPosition: { x: 0, y: 0 },
        firstViewPosition: 0,
        api: 'https://api-smarttv.fbox.fpt.vn/smarttv/vod/getitemlist/v1/B8FFB303FFE8/SGDN00017/1103728/90/1103728/vi/1/1/0/0/1/0/70/11?&st=hqWajCcuqSfaTOiCL0qBnw&expires=91957457191&pf=11'
    },
    created() {
        $.getJSON(this.api, function(res) {
            app.items = res.root.item;
            console.log(this.items);
            app.arrSelect = [
                app.items.map((value, index) => { return index < 1 }),
                app.items.map(index => { return false })
            ];
        });

    },


    methods: {
        updatePos: function(newPos) {
            let tmpPos = Object.assign({}, this.currentPosition);
            this.$set(this.arrSelect[tmpPos.y], tmpPos.x, false);
            this.currentPosition.x = newPos.x;
            this.currentPosition.y = newPos.y;
            this.$set(this.arrSelect[newPos.y], newPos.x, true);
        },
        up: function() {
            if (this.currentPosition.y > 0) {
                this.updatePos({
                    x: 0,
                    y: this.currentPosition.y - 1
                });
                this.$set(this, 'rightPercent', 0);
                this.$set(this, 'firstViewPosition', 0);
            }
        },
        down: function() {
            if (this.currentPosition.y < this.arrSelect.length - 1) {
                this.updatePos({
                    x: 0,
                    y: this.currentPosition.y + 1
                });
                this.$set(this, 'rightPercent', 0);
                this.$set(this, 'firstViewPosition', 0)
            }
        },
        left: function() {
            if (this.currentPosition.x > 0) {
                this.updatePos({
                    x: this.currentPosition.x - 1,
                    y: this.currentPosition.y
                });
                if (this.currentPosition.x <= this.firstViewPosition && this.firstViewPosition != 0) {
                    this.$set(this, 'rightPercent', this.rightPercent - (100 / this.items.length));
                    this.$set(this, 'firstViewPosition', this.firstViewPosition - 1)
                }
            }
        },
        right: function() {
            if (this.currentPosition.x < this.arrSelect[this.currentPosition.y].length - 1) {
                this.updatePos({
                    x: this.currentPosition.x + 1,
                    y: this.currentPosition.y
                });

                if (this.currentPosition.x > this.firstViewPosition + 5) {
                    this.$set(this, 'rightPercent', this.rightPercent + (100 / this.items.length));
                    this.$set(this, 'firstViewPosition', this.firstViewPosition + 1)
                }
            }
        },
        enter: function() {
            alert(`selected at box[${this.currentPosition.y}][${this.currentPosition.x}]`);

        }
    }
})