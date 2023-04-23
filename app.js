// 紀錄代辦事項
let list = [];
// 紀錄過濾後的代辦事項
let filterList = [];

// 用於刪除已完成的代辦事項
const clearBtnSeletor = document.querySelector('.list_footer');
clearBtnSeletor.addEventListener('click', function(e){
    if(e.target.nodeName === 'BUTTON'){
        list = list.filter(item => item.isChecked !== true);
    }
    if(!tabArray[0].classList.contains("active")){
        tabArray.forEach((item) => {
            item.classList.remove('active');
        })
        tabArray[0].classList.add('active');
    }
    refreshList();
})

// 用於代辦事項的過濾
const tabGroup = document.querySelector('.tab');
const tabArray = document.querySelectorAll('.tab_item');
tabGroup.addEventListener('click', function(e){
    tabArray.forEach((item) => {
        item.classList.remove('active');
    })
    e.target.classList.add('active')
    
    refreshList(e.target.getAttribute('data-todo'));
})


// 點擊空白輸入事項
document.body.onkeyup = function(e){
    if(e.key == "Enter" || e.code == "Enter" || e.keyCode == 13) {
        addItem();
    }
}

// 新增代辦事項
function addItem(){
    const input = document.querySelector('input');
    if(input.value === ''){
        alert("請輸入代辦事項。")
        return;
    }
    const item = {
        isChecked: false,
        id: guidGenerator(),
        name: input.value,
    };

    list.push(item);
    input.value = '';
    refreshList();
}
// 刪除代辦事項
function delItem(id){
    list = list.filter((item) => item.id !== id);
    refreshList();
}

// 呈現表單資料
function refreshList(tab){
    switch (tab) {
        case "notDone":
            filterList = list.filter((item) => item.isChecked !== true);
            break;
        case "isDone":
            filterList = list.filter((item) => item.isChecked !== false);
            break;
        default:
            filterList = list;
            break;
    }

    let str = '';
    const listSelector = document.querySelector('.list');
    filterList.forEach((item) => {
        let checkStr = '';
        if(item.isChecked){
            checkStr = `<input type="checkbox" data-id='${item.id}' onclick="changeItemState(this)" checked/>`
        }
        else{
            checkStr = `<input type="checkbox" data-id='${item.id}' onclick="changeItemState(this)"/>`
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
    NotDoneItem();
}
// 更改事項勾選狀態
function changeItemState(changeItem) {
    list.map((item) => {
        if(item.id === changeItem.getAttribute("data-id")){
            if(changeItem.checked){
                item.isChecked = true;
            }
            else{
                item.isChecked = false;
            }
        }
    })
    NotDoneItem();
}
// 目前未完成事項總數
function NotDoneItem(){
    const totalNotDoneSeletor = document.querySelector('.list_footer p');
    const clearBtn = document.querySelector('.clear');
    const totalNotDoneItem = list.filter(item => item.isChecked !== true).length;
    totalNotDoneSeletor.textContent = `${totalNotDoneItem} 個待完成項目`;

    if(totalNotDoneItem === list.length){
        clearBtn.disabled = true;
    }
    else{
        clearBtn.disabled = false;
    }
}
// 額外參考：事項的ID產生方法
function guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     };
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}