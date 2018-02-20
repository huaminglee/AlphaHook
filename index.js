Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abiJS = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

web3.eth.defaultAccount = '0xed32019f2355914b1fd206dd31c92610a478fb51';

var CoursetroContract = web3.eth.contract(abiJS);

var VotingContractInstance = CoursetroContract.at('0x46c8a21987a409c54fd07b0a90ec28a0104686a4');
console.log(VotingContractInstance);



candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}
function asciiToHex(str){
    if(!str)
        return "0x00";
    var hex = "";
    for(var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        var n = code.toString(16);
        hex += n.length < 2 ? '0' + n : n;
    }
    return "0x" + hex;
}
candidateName = 'Rama';
console.log(asciiToHex(candidateName));

function voteForCandidate1() {
  candidateName =  $("#candidate").val();
  hexCandidateName = asciiToHex(candidateName);
  console.log(candidateName);

  VotingContractInstance.voteForCandidate(hexCandidateName, function(){
      console.log("im here");
      let div_id = candidates[candidateName];
      $("#" + div_id).html(VotingContractInstance.totalVotesFor.call(hexCandidateName).toString());
    });
}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = VotingContractInstance.totalVotesFor.call(asciiToHex(name)).toString()
    $("#" + candidates[name]).html(val);
  }
});