var iconList = {

    list: [],

    elemList: document.querySelector('.list'),
    elemSearch: document.querySelector('.search'),

    update: function(){
        let html = '';

        for(const icon of this.list){
            html += '<div class="list--item">' +
                '<div class="list--svg">' + icon.svg + '</div>' +
                '<div class="list--name">' + icon.name + '</div>' +
            '</div>';
        }

        this.elemList.innerHTML = html;
    }

};

document.addEventListener('DOMContentLoaded', function(){
    iconList.update();
});