var nodes = [];
var indexes = [];
var dones = [];
ddata = data;
function sort() {
    dones = [];
    indexes = [];
    nodes = [];
    var i = 0;
    data.forEach(function (branch, index) {
        if (branch.parent_id === 0) {
            nodes.push(branch);
            indexes.push({id: branch.id, pos: [i]});
            i++;
            dones.push(index);
        }
    });
}
function sort2() {
    data.forEach(function(branch,index){
        if(dones.includes(index)) return;
        try {
            var position = indexes.find(elem => elem.id === branch.parent_id).pos;
        } catch {
        }
        if (position !== undefined) {
            indexes.push({id: branch.id, pos: []});
            var string = "";
            position.forEach(function (index, i) {
                string += "nodes[" + index + "].";
                indexes.find(elem => elem.id === branch.id).pos.push(index);
                if (position.length === ++i) {
                    string += "nodes";
                    console.log(string);
                    let x = eval(string);

                    if (x === undefined) {
                        string += " = []";
                        x = eval(string);
                        indexes.find(elem => elem.id === branch.id).pos.push(0);
                    } else {
                        indexes.find(elem => elem.id === branch.id).pos.push(x.length);
                    }
                    x.push(branch);
                }
            });
            dones.push(index);
        }
    });

}
function refresh(){
    sort();
    while(dones.length !== data.length)sort2();
    $('#tree').treeview({'data':nodes});
    data.forEach(function(branch){delete branch.nodes;});
}
refresh();
window.nodes = nodes;
window.indexes = indexes;
window.dones = dones;
window.add = function add(){

    var text = $('.node-selected').text();
    var name = $('#addtext').val();
    if (data.find(elem => elem.text === name) === undefined && name !== ""){
        try{var newID = data[data.length-1].id + 1;}
        catch{var newID = 1;}
        if (text===""){
            var obj = {id: newID, text: name, parent_id: 0};
            console.log(obj);
        } else {
            var id = data.find(elem => elem.text === text).id;
            var obj = {id: newID, text: name, parent_id: id};
        }
        data.push(obj);
        refresh();
    }
};
window.remove = function remove(){
    var text = $('.node-selected').text();
    var id = data.find(elem => elem.text === text).id;
    var dis = [data.findIndex(elem => elem.text === text)];
    function recursive(dis, id){
    data.forEach(function(branch,di){
        if(branch.parent_id === id){
            dis.push(di);
            recursive(dis, branch.id);
        }
    });
    }
    recursive(dis,id);
    console.log(dis);
    dis.sort(function(a, b){return b-a});
    dis.forEach(function(ind){
        data.splice(ind, 1);
    });
    refresh();
};

window.edit = function edit(){
    var name = $('#addtext').val();
    var text = $('.node-selected').text();
    var index = data.findIndex(elem => elem.text === text);
    data[index].text = name;
    refresh();
};
window.send = function send(){
    $.post('/struct', { _token: $('meta[name=csrf-token]').attr('content'), _method : 'POST', data : JSON.stringify(data) },function(data,status){
        console.log(data);
        console.log(status);
    });
};
