// Create Dino Constructor
let jsonDino = new Array();
fetch('./dino.json').then(res => res.json()).then(data => {
    this.jsonDino = data.Dinos.map((i) => i)

})


// Create Dino Objects
function Dino(species, weight, height, diet, where, when, fact, image) {


    return {
        //properties
        species: species,
        weight: weight,
        height: height,
        diet: diet,
        where: where,
        fact: fact,
        image: './images/' + species.toLowerCase() + '.png',
        facts: [],
        //methods
        compareName: function (name) {
            let result = null

            if (this.species.length > name.length) {
                result = 'The number of letter in dinasour name is more than human name'

            } else if (this.species.length < name.length) {
                result = 'The number of letter in human name name is more than dinasour'

            }
            console.log(result)
            this.addFact(result)

        },
        compareWeight: function (weight) {
            let result = null

            if (this.weight > weight) {
                result = 'The dinasour weight heavier than human'

            } else if (this.weight < weight) {
                result = 'The human weight heavier than dinasour'


            }
            this.addFact(result)

        },
        compareDiet: function (diet) {
            let result = null
            if (this.diet != diet) {
                result = 'The dinasour diet is ' + this.diet + ' human diet is ' + diet


            } else if (this.diet == diet) {
                result = 'The dinasour and human diet is the same'


            }
            this.addFact(result)

        },
        addFact: function (res) {
            this.facts.push(this.fact)
            this.facts.push(res)
        },

        RandomFact: function () {

            let i = Math.floor(Math.random() * 10) % this.facts.length;
            return this.facts[i];
        }
    };
}
// Create Human Object
const Human = new Object();

// Use IIFE to get human data from form
function getHumanData() {

    Human.name = document.getElementById('name').value
    Human.height_feet = document.getElementById('feet').value
    Human.height_inches = document.getElementById('inches').value
    Human.Weight = document.getElementById('weight').value
    Human.diet = document.getElementById('diet').value
    Human.image = './images/human.png'
    return Human;
}


// Generate Tiles for each Dino in Array

function getGridItem(species, imageUrl, fact) {
    let gridItemDiv = document.createElement('div');
    gridItemDiv.className = 'grid-item';

    // add species
    let speciesDiv = document.createElement('h3');
    speciesDiv.innerText = species;
    gridItemDiv.appendChild(speciesDiv);

    //adding fact
    let factDiv = document.createElement('h6');
    factDiv.innerText = fact;
    gridItemDiv.appendChild(factDiv);

    //  add image
    let imageDiv = document.createElement('img');
    imageDiv.src = imageUrl;
    gridItemDiv.appendChild(imageDiv);



    return gridItemDiv;
}

// On button click, prepare and display infographic
function OnCompare() {

    document.getElementById('dino-compare').style.display = 'none';

    let h = getHumanData()


    let dinos = this.jsonDino
    // Generate Grids and add back to DOM
    for (let i in dinos) {
        let dino = dinos[i];
        const d = new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact, dino.image)

        d.compareName(h.name);
        d.compareWeight(h.Weight);
        d.compareDiet(h.diet)
        let fact_res = d.RandomFact()



        //             let fact = dino.getRandomFact();
        let gridItemDiv;
        if (dino.species == 'Pigeon') {

            gridItemDiv = getGridItem(d.species, d.image, d.fact);

        } else {

            gridItemDiv = getGridItem(d.species, d.image, fact_res);
        }



        document.getElementById('grid')
            .appendChild(gridItemDiv);
        if (i == 3) {
            // insert human tile at center
            let humanTileDiv = getGridItem(h.name, h.image, '');

            document.getElementById('grid')
                .appendChild(humanTileDiv);
        }
    }


}
