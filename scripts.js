var total = 0;
var gold = 0;
var copper = 0;
var strength = 5;
var mininglevel = 1;
var smithinglevel = 1;

//function for showing inventory
//depricated, but also handy because it sets it to block, and I'm lazy. so I'm keeping it here.
function showInventory() {
	var inventory = document.getElementById("supplies");
	inventory.style.display = "block";
}

//function to create supplies
function createSupplies() {
	//on button press, create random amount of supplies between 1 - 3 and display in inventory
	var supplies = Math.floor(Math.random() * 3) + 1;
	//i becomes a counter and loops through until i = supplies defined on line 11
	for (var i = 0; i < supplies; i++) {
		//create an image of a bar every time the loop runs
		//add one to number of supplies
		total++;
		console.log(total);
		var img = document.createElement("img");
		img.src = "copper_bar.jpeg";
		img.id = "copper_bar";
		console.log("image created");
		document.getElementById("supplies").appendChild(img);
	}
	//write total supplies to the html
	document.getElementById("numberofsupplies").innerHTML = total;
	//write to info what you got
	let info = document.createElement("p");
	let infodetail = document.createTextNode("You found " + supplies + " copper bars\n");
	//add the text to the info
	info.appendChild(infodetail);
	//add the info to the div
	//document.getElementById("info").appendChild(info);
}

//a function to create a smithing menu to choose what to make
function createSmithingMenu() {
	//use blacksmithmenu div to display smithing menu
	var smithingmenu = document.getElementById("blacksmithmenu");
	smithingmenu.style.display = "block";
	//hook a button for each item to make
	//hook into create_sword button change to img
	var swordbutton = document.getElementById("create_sword");
	swordbutton.src = "sword.png";
	//hook into create_axe button change to img
	var axebutton = document.getElementById("create_axe");
	axebutton.src = "axe.jpeg";
	}
	

//function to create a sword
function createSword() {
	//check that you have enough supplies to make a sword
	//if supplies is equal to or greater to two then create a sword
	//get the quality from the copper bar

	//use the input from the input copperswordquantity
	var copperswordquantity = document.getElementById("copperswordquantity").value;
	//check if the input is a number
	if (isNaN(copperswordquantity)) {
		alert("Please enter a number");
	}
	//check if you have enough supplies, if not alert
	else if (total < 2*copperswordquantity) {
		alert("You don't have enough supplies to make that many swords");
	}
	else {
		//check if the input is 2*copperswordquantity or better
		if (total >= 2*copperswordquantity) {
			//remove 2*copperswordquantity supplies
			total -= 2*copperswordquantity;
			for (var i = 0; i < copperswordquantity; i++) {
				//create sword
				var sword = document.createElement("img");
				sword.src = "sword.png";
				sword.id = "sword";
				document.getElementById("supplies").appendChild(sword);
				console.log("made sword");
				//remove 2 bars
				for (var j = 0; j < 2; j++) {
					let bar = document.getElementById("copper_bar");
					bar.remove();
				}
				//update total supplies
				document.getElementById("numberofsupplies").innerHTML = total;
			}
		}
	}
}

function maxSword() {
  // Get the number of copper bars available
  const copperBars = Number(document.getElementById("numberofsupplies").textContent);

  // Calculate the maximum number of swords that can be made with the available copper bars
  const maxSwords = Math.floor(copperBars / 2);

  // Set the copperswordquantity input field to the maximum number of swords
  document.getElementById("copperswordquantity").value = maxSwords;
}


//function to crate an axe
function createAxe() {
	//check that you have enough supplies to make an axe
	//if supplies is equal to or greater to three then create an axe
	if (total >= 3) {
		//create an axe
		let axe = document.createElement("img");
		axe.src = "axe.jpeg";
		axe.id = "axe";
		document.getElementById("supplies").appendChild(axe);
		console.log("made axe");
		//remove 3 supplies
		total -= 3;
		for (let i = 0; i < 3; i++) {
			let bar = document.getElementById("copper_bar");
			bar.remove();
			}
	}
	//update total supplies
	document.getElementById("numberofsupplies").innerHTML = total;
}

//function to sell swords
function sellSword() {
	//check if you have a sword
	if (document.getElementById("sword")) {
		//remove a sword
		let sword = document.getElementById("sword");
		sword.remove();
		//add 15 gold
		gold += 15;
	}
	//update total gold
	document.getElementById("gold").innerHTML = gold;
}

//function to sell axes
function sellAxe() {
	//check if you have an axe
	if (document.getElementById("axe")) {
		//remove an axe
		let axe = document.getElementById("axe");
		axe.remove();
		//add 20 gold
		gold += 20;
	}
	//update total gold
	document.getElementById("gold").innerHTML = gold;
}

//function to mine copper
function mineCopper() {
	//to mine, you use player strength, mining skill, and luck
	//luck is a random number between 1 and 10
	let luckstat = 0;
	let rockhp = 5;
	let luck = Math.floor(Math.random() * 10) + 1;
	//if luck is 10, you get a bonus
	if (luck == 10) {
		let luckstat = 3;
	}
	else {
		let luckstat = 0;
	}
	//use the formula to calculate damage
	let damage = mininglevel/2 + strength + luckstat* 0.20;
	//subtract damage from rock hp
	rockhp -= damage;
	//if rock hp is less than or equal to 0, you get an ore
	if (rockhp <= 0) {
		//create an ore
		let ore = document.createElement("img");
		ore.src = "Copper_ore_detail.png";
		ore.id = "copper_ore";
		document.getElementById("supplies").appendChild(ore);

		//give each ore a random quality level from 0.01 - 100.00 as a float
		let quality = Math.random() * 100;
		//round quality to 2 decimal places
		quality = Math.round(quality * 100) / 100;
		//add quality to data attribute for img
		ore.setAttribute("data-quality", quality);

		if (quality >= 99.99) {
			//if quality 99.99 make img copper_ore_perfect
			ore.src = "Copper_ore_perfect_detail.png";
		}

		ore.addEventListener("mouseover", (event) => {
			let quality = event.target.getAttribute("data-quality");
			event.target.setAttribute("title", "Quality: " + quality);
		});
		//add one to total ore
		copper++;
		//show ores gained
		document.getElementById("copper").innerHTML = copper;
		//write to info what you got
		let info = document.createElement("p");
		let infodetail = document.createTextNode("You mined 1 copper ore");
		info.appendChild(infodetail);
		//document.getElementById("info").appendChild(info);
	}
	else {
		//rip in pieces no ore, tell em
		let info = document.createElement("p");
		let infodetail = document.createTextNode("You did not get an ore");
		info.appendChild(infodetail);
		document.getElementById("info").appendChild(info);
	}

}

//function to smelt ore into bars
function smeltCopper() {
	//check if you have ore
	if (copper > 0) {
		//remove an ore
		copper--;
		let ore = document.getElementById("copper_ore");
		//get quality of ore and store it
		let quality = ore.getAttribute("data-quality");
		ore.remove();
		//add one to total bars
		total++;
		//add bar image
		var img = document.createElement("img");
		img.src = "copper_bar.jpeg";
		img.id = "copper_bar";

		//add quality to data attribute for img
		img.setAttribute("data-quality", quality);
		//smithing can increase quality of bars
		//with this formula at 99 smithing the max quality to gain is 2.475
		let smithing = smithinglevel/2 * 0.05;
		//add smithing to quality
		smithing += parseFloat(quality);

		//round quality to 2 decimal places
		quality = Math.round(smithing * 100) / 100;
		//add quality to data attribute for img
		img.setAttribute("data-quality", quality);

		console.log("image created");
		document.getElementById("supplies").appendChild(img);
		document.getElementById("numberofsupplies").innerHTML = total;

		//add event listener to show quality on hover
		img.addEventListener("mouseover", (event) => {
			let quality = event.target.getAttribute("data-quality");
			event.target.setAttribute("title", "Quality: " + quality);
		});

		//write to info what you got
		let info = document.createElement("p");
		let infodetail = document.createTextNode("You made 1 copper bar");
		info.appendChild(infodetail);
		//document.getElementById("info").appendChild(info);
		document.getElementById("numberofsupplies").innerHTML = total;
	}
	else {
		//rip in pieces no ore, tell em
		let info = document.createElement("p");
		let infodetail = document.createTextNode("You do not have any copper ore");
		info.appendChild(infodetail);
		document.getElementById("info").appendChild(info);
	}
}

function blacksmith() {
	//show forge menu
	document.getElementById("header").innerHTML = "Blacksmith";
	document.getElementById("menu").style.display = "none";
	document.getElementById("marketmenu").style.display = "none";
	document.getElementById("minesmenu").style.display = "none";
	document.getElementById("blacksmithmenu").style.display = "block";
}

function market() {
	//show market menu
	document.getElementById("header").innerHTML = "Market";
	document.getElementById("menu").style.display = "none";
	document.getElementById("blacksmithmenu").style.display = "none";
	document.getElementById("minesmenu").style.display = "none";
	document.getElementById("marketmenu").style.display = "block";
}

function mines() {
	//show mines menu
	document.getElementById("header").innerHTML = "Mines";
	document.getElementById("menu").style.display = "none";
	document.getElementById("blacksmithmenu").style.display = "none";
	document.getElementById("marketmenu").style.display = "none";
	document.getElementById("minesmenu").style.display = "block";
}