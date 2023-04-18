// 紀錄代辦事項
let list = [];
// 紀錄過濾後的代辦事項
let filterList = [];

// 用於刪除已完成的代辦事項
const itemNum = document.querySelector('.list_footer');
itemNum.addEventListener('click', function(e){
    if(e.target.nodeName === 'A'){
        list = list.filter(item => item.checked !== true);
    }
    refreshList();
})

// 用於代辦事項的過濾
const tabGroup = document.querySelector('.tab');
const tabArray = document.querySelectorAll('.tab-item');
tabGroup.addEventListener('click', function(e){
    tabArray.forEach((item) => {
        item.classList.remove('active');
    })
    e.target.classList.add('active')
    
    refreshList(e.target.getAttribute('data-todo'));
})

// 用於更改事項的勾選狀態
const listSelector = document.querySelector('.list');
listSelector.addEventListener('change', function(e){
    if(e.target.nodeName = 'INPUT'){
        isCompeleteItem()
    }
})

// 新增代辦事項
function addItem(){
    const input = document.querySelector('input');
    if(input.value === ''){
        alert('請輸入代辦事項');
        return;
    }
    const item = {};
    item.checked = false;
    item.id = guidGenerator();
    item.name = input.value;
    list.push(item);
    input.value = '';
    refreshList('all');
}
// 刪除代辦事項
function delItem(id){
    list = list.filter((item) => item.id !== id);
    refreshList();
}

// 呈現表單資料
function refreshList(tab){
    switch (tab) {
        case "noCompelete":
            filterList = list.filter((item) => item.checked !== true);
            break;
        case "isCompelete":
            filterList = list.filter((item) => item.checked !== false);
            break;
        default:
            filterList = list;
            break;
    }

    let str = '';
    console.log(filterList);
    filterList.forEach((item) => {
        let checkStr = '';
        if(item.checked){
            checkStr = `<input type="checkbox" data-id='${item.id}' checked/>`
        }
        else{
            checkStr = `<input type="checkbox" data-id='${item.id}'/>`
        }
        str = str.concat(`<li>
        <label class="checkbox" for="">
        ${checkStr}
        <span>${item.name}</span>
        </label>
        <a href="#" class="delete" onclick="delItem('${item.id}')"></a>
        </li>`)
    })
    listSelector.innerHTML = str;
    totalNoCompleteItem();
}
// 更改事項勾選狀態
function isCompeleteItem() {
    const isCheckItem = document.querySelectorAll('input[type="checkbox"]:checked')
    isCheckItem.forEach((checked) => {
        list.forEach((item) => {
            if(item.id === checked.getAttribute('data-id')){
                item.checked = true;
            }
        })
    })
    totalNoCompleteItem();
}
// 目前未完成事項總數
function totalNoCompleteItem(){
    const totalNum = document.querySelector('.list_footer p')
    totalNum.textContent = `${list.filter(item => item.checked !== true).length} 個待完成項目`;
}
// 額外參考：事項的ID產生方法
function guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     };
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}