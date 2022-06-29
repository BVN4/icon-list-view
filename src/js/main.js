var iconList = {

    list: [],

    elemList: document.querySelector('.list'),
    elemSearch: document.querySelector('.search'),
	success: document.querySelector('.success'),

	searchValue: [],

    update: function(){
        let html = '';

        for(const i in this.list){
			if(!this.searchFunc(this.list[i].search)) continue;

			html += '<div class="list--item" index="' + i + '">' +
				'<div class="list--svg">' + this.list[i].svg + '</div>' +
				'<div class="list--name">' + this.list[i].name + '</div>' +
			'</div>';
        }

        this.elemList.innerHTML = html;
    },

	copy: function(e){
		const elem = e.target.closest('.list--item');
		const index = elem.getAttribute('index');

		navigator.clipboard.writeText(this.list[index].iconPath).then(() => {
			this.success.classList.add('active');

			return new Promise(function(resolve, reject){
				setTimeout(resolve, 200);
			});
		}).then(() => {
			this.success.classList.remove('active');
		}).catch(err => {
			console.log('Something went wrong', err);
		});
	},

	search: function (){
		this.searchValue = this.elemSearch.value.toLowerCase()
			.replace(/[^0-9a-zа-яё\s]/gi, '')
			.trim().replace(/\s+/gi, ' ').split(/\s_-/gi);

		this.update();
	},

	searchFunc: function(text){
		for(const value of this.searchValue){
			if(text.indexOf(value) === -1) return false;
		}
		return true;
	}

};

document.addEventListener('DOMContentLoaded', function(){
    iconList.update();
});

iconList.elemList.addEventListener('click', function (e){
	iconList.copy(e);
});

iconList.elemSearch.addEventListener('input', function (e){
	iconList.search(e);
});