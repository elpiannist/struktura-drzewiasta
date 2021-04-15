
var nodes = [];
var indexes = [];
var done = [];

var i = 0;
data.forEach(function (branch, index) {
    if (branch.parent_id === 0) {
        nodes.push(branch);
        indexes.push({id: branch.id, pos: [i]});
        i++;
        done.push(index);
    }
});
function sort() {
    data.forEach(function(branch,index){
        if(done.includes(index)) return;
        try {
            var position = indexes.find(elem => elem.id === branch.parent_id).pos;
        } catch {
        }
        if (position !== undefined) {
            indexes.push({id: branch.id, pos: []});
            var string = "";
            position.forEach(function (index, i) {
                console.log(i);
                string += "nodes[" + index + "]";
                indexes.find(elem => elem.id === branch.id).pos.push(index);
                if (position.length === ++i) {
                    string += ".nodes";
                    console.log(string);
                    var x = eval(string);

                    if (x === undefined) {
                        string += " = []";
                        x = eval(string);
                        indexes.find(elem => elem.id === branch.id).pos.push(0);
                    } else {
                        indexes.find(elem => elem.id === branch.id).pos.push(x.length);
                    }
                    x.push(branch);
                    done.push(index);
                }
            });
        }
    });
}
while(done.length !== data.length)sort();
$('#tree').treeview({'data':nodes});
