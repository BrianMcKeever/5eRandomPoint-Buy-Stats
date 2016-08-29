var pointsLeft = 27;
var ensureAttackStatAtLeast = 15;

function totalStat(stat){
  if(stat == 15) return 9;
  if(stat == 14) return 7;
  return stat - 8;
}

function totalStats(stats){
  var sum = 0;
  stats.forEach(function(x){
    sum += totalStat(x);
  });
  return sum;
}

function incrementStats(stats){
  var attr = Math.floor(Math.random() * 6);
  if (stats[attr] === 15) {
    return incrementStats(stats);
  }
  stats = stats.slice();
  stats[attr]++;
  return stats;
}

function rollStats(totalPoints){
  var str = dex = con = intel = wis = cha = 8;
  var stats = [str, dex, con, intel, wis, cha];
  var total = 0;
  while(total < totalPoints){
    var stat = Math.floor(Math.random() * 6);
    if (stats[stat] == 15) continue;
    var newStats = incrementStats(stats);
    var newTotal = totalStats(newStats);
    if(newTotal <= totalPoints){
      total = newTotal;
      stats = newStats;
    } 
  }
  return stats;
}

function isAttackGoodEnough(stats, ensuredAttack){
  var testStats = stats.slice();
  testStats.splice(2, 1);
  var max = 0;
  for(var stat of testStats){
    max = Math.max(stat, max);
  }
  return ensuredAttack <= max;
}

function rollEnsuredStats(totalPoints, ensuredAttackStatAtLeast){
  var stats;
  do{
    stats = rollStats(totalPoints);
  }while(!isAttackGoodEnough(stats, ensuredAttackStatAtLeast));
  return stats;
}

function onRollButtonClick(event){
  event.preventDefault();
  var points = document.getElementById("pointsField").value;
  var stats = rollStats(points);
  updateDisplay(stats);
}

function updateDisplay(stats){
  document.getElementById("strTd").innerHTML = stats[0];
  document.getElementById("dexTd").innerHTML = stats[1];
  document.getElementById("conTd").innerHTML = stats[2];
  document.getElementById("intTd").innerHTML = stats[3];
  document.getElementById("wisTd").innerHTML = stats[4];
  document.getElementById("chaTd").innerHTML = stats[5];
}


window.onload = function(){
  var button = document.getElementById("rollButton");
  button.addEventListener("click", onRollButtonClick);
};
