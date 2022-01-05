window.onload = function(){
	// 购物车表格
	var table = document.getElementById("cartTable");
	// console.log(table);
	var tr = table.children[1].rows;
	// console.log(tr);
	// 所有勾选框
	var selectInputs = document.getElementsByClassName('check');
	// console.log(selectInputs);
	// 全选框
	var selectAllInput = document.getElementsByClassName('check-all');
	// console.log(selectInputs.length);
	// 已选商品的数目
	var selectedTotal = document.getElementById("selectedTotal");
	// 总计
	var priceTotal = document.getElementById("priceTotal");
	// 已选商品
	var selected = document.getElementById("selected");
	// 删除全部
	var deleteAll = document.getElementById("deleteAll");
	for (var i = 0; i < selectInputs.length; i++) {
		selectInputs[i].onclick = function(){
			// 如果选中了全选的话
			if (this.className.indexOf('check-all') >= 0) {
				for(var j = 0; j< selectInputs.length ; j++){
					selectInputs[j].checked = this.checked;
				}
			}
			// 如果只要有一个没有选中，那么我们的这个全选就取消
			if(!this.checked){
				for (var i = 0; i < selectAllInput.length; i++) {
					selectAllInput[i].checked = false;
				}
			}
			// 选完后更新总计
			getTotal();
		}
	}
	// 更新总计和总数
	function getTotal(){
		// 已选的商品
		var selected =0;
		var  price = 0;
		for(var i=0;i<tr.length;i++){
			if (tr[i].getElementsByTagName('input')[0].checked) {
				tr[i].className = "on";
				// 已选的商品进行累加
				selected += parseInt( tr[i].getElementsByTagName("input")[1].value);
				// console.log(selected);
				// 已选商品的价格进行累加
				price += parseFloat(tr[i].cells[4].innerHTML);
				// console.log(price);
			}else{
				tr[i].className ="";
			}
			selectedTotal.innerHTML = selected;
			priceTotal.innerHTML = price.toFixed(2);
			// console.log(tr[i]);
		}
	}
	// 为每行元素添加事件
	for(var i = 0; i< tr.length ; i++){
		tr[i].onclick = function(e){
			var e = e || window.event;
			// 通过事件对象的target属性来去触发元素
			var el = e.target;
			var cls = el.className;
			// console.log(e);
			// console.log(el);
			// console.log(cls);
			var  countInput = this.getElementsByTagName('input')[1];
			var value =parseInt(countInput.value);
			// console.log(value);
			// 判断点击的是什么
			switch(cls){
				case "add":
					countInput.value = value+1;
					getSubtotal(this);
					break;
				case "reduce":
					if (value >1) {
						countInput.value = value-1;
						getSubtotal(this);
					}
					break;
				case "delete":
					var con = confirm("确定要删除此商品吗？");
					if (con) {
						this.parentNode.removeChild(this);
					}
					break;
			}
			getTotal();
		}
	}
	// 计算单行价格
	function getSubtotal(tr){
		var cells = tr.cells;
		// console.log(cells);
		var price = cells[2];
		var subtotal = cells[4];
		var countIn = tr.getElementsByTagName("input")[1];
		var span = tr.getElementsByTagName("span")[1];

		// 写入HTML
		subtotal.innerHTML = (parseInt(countIn.value)*parseFloat(price.innerHTML)).toFixed(2);
		if (countIn.value == 1) {
			span.innerHTML = "";
		}else{
			span.innerHTML = "-";
		}
	}
	// 点击全部删除
        deleteAll.onclick = function(){
            if (selectedTotal.innerHTML != 0 ) {
                var con = confirm('确定删除所选商品吗？');
                if (con) {
                    for (var i = 0; i < tr.length; i++) {
                        // 如果被选中，就删除相应的行
                        if (tr[i].getElementsByTagName('input')[0].checked) {
                            // 删除相应节点
                            tr[i].parentNode.removeChild(tr[i]);
                            // 回退下标位置
                            i--;
                        }
                    }
                }
            }else{
                alert('请选择商品！');
            }
             getTotal();
        }
}