function main() {

  var participants = [];
  var participantForm = document.getElementById('participantForm');
  var participantList = document.getElementById('participantList');
  var filterInput = document.getElementById('filterInput');
  var filterBtn = document.getElementById('filterBtn');

  participantForm.addEventListener('submit', submitParticipant);
  filterBtn.addEventListener('click', searchParticipant);
  filterInput.addEventListener('keyup', function (event) {
    event.preventDefault();
    if (event.code === 'Enter') {
      searchParticipant();
    }
  });

  function searchParticipant() {
    var filteredParticipants = participants.filter(function (participant) {
      return participant.name.toLowerCase().indexOf(this.value.toLowerCase()) !== -1;
    });
    clearAllDOMParticipants();
    createDOMParticipantsList(filteredParticipants);
  }

  function submitParticipant(event) {
    event.preventDefault();
    var nameElem = this.querySelector('#name');
    var ageElem = this.querySelector('#age');
    var roleElem = this.querySelector('#role');
    var coffeeDrinkerElem = this.querySelector('#coffee');
    var participant = {
      name: nameElem.value.trim(),
      age: ageElem.value,
      role: roleElem.selectedIndex > 0 ? roleElem.options[roleElem.selectedIndex].text : undefined,
      coffeeDrinker: coffeeDrinkerElem.checked
    };

    if (participantIsValid(participant)) {
      addParticipant(participant);
      nameElem.value = '';
      ageElem.value = '';
      roleElem.selectedIndex = 0;
      coffeeDrinkerElem.checked = false;
      displayFormError(false);
    } else {
      displayFormError(true);
    }
  }

  function displayFormError(show) {
    var formErrorElem = document.getElementById('form-error');
    formErrorElem.style.visibility = show ? 'visible' : 'hidden';
  }

  function participantIsValid(participant) {
    return participant.name.length > 0 && participant.age > 0 && participant.role;
  }

  function addParticipant(participant) {
    participants.push(participant);
    var participantIndex = participants.length - 1;
    addParticipantToDOM(participant, participantIndex);
  }

  function createDOMParticipantsList(participants) {
    participants.forEach(function (participant, index) {
      var resultItem = createResultItem(participant, index);
      participantList.appendChild(resultItem);
    })
  }

  function clearAllDOMParticipants() {
    while (participantList.firstChild) {
      participantList.removeChild(participantList.firstChild);
    }
  }

  function addParticipantToDOM(participant, participantIndex) {
    var resultItem = createResultItem(participant, participantIndex);
    participantList.appendChild(resultItem);
  }

  function createResultItem(participant, index) {
    var listItem = document.createElement('div');
    listItem.className = 'results-list__item';

    var label = document.createElement('label');
    var participantInfo =
      participant.name + ', ' +
      participant.age + ' years old, is a ' +
      participant.role + ' developer and ' +
      (participant.coffeeDrinker ? 'loves' : 'hates') + ' coffee!';
    label.appendChild(document.createTextNode(participantInfo));
    listItem.appendChild(label);

    var removeBtn = document.createElement('button');
    removeBtn.className = 'button button--remove';
    removeBtn.type = 'submit';
    removeBtn.appendChild(document.createTextNode('remove'));
    removeBtn.addEventListener('click', removeParticipant(index));
    listItem.appendChild(removeBtn);

    return listItem;
  }

  function removeParticipant(index) {
    return function () {
      participants.splice(index, 1);
      clearAllDOMParticipants();
      createDOMParticipantsList(participants);
    }
  }

}

