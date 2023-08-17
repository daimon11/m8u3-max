// остановился на 14.45

class Column {
  constructor(type, speed) {
    this.type = type;
    this.speed = speed;
    this.car = null;
  }
}


// column



class Station {
  constructor(typeStation) {
    this.typeStation = typeStation;
    this.queue = [];
    this.filling = [];
    this.ready = [];
  }

  init() {
    for (const optionStation of this.typeStation) {
      for (let i = 0; i < optionStation.count; i++) {
        this.filling.push(new Column(optionStation.type, optionStation.speed))
      }
    };

    setInterval(() => {
      this.checkQueueToFilling();
    }, 2000);
  };

  checkQueueToFilling() {
    if (this.queue.length) {
      for (let i = 0; i < this.queue.length; i++) {
        for (let k = 0; k < this.filling.length; k++) {
          if(!this.filling[k].car && this.queue[i].typeFuel === this.filling[k].typeFuel) {
            this.filling[k].car = this.queue.splice(i, 1)[0];
          
          }
        }

      }
    }
  }
}


// станция


class Car1 {
  constructor(brand, model, maxTank) {
    this.brand = brand;
    this.model = model;
    this.maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  };

  needPetrol() {
    return this.maxTank - this.nowTank;
  }

  fillUp() {
    this.nowTank = this.maxTank;
  }
};

class PassangerCar extends Car1 {
  typeCar = 'passenger';

  constructor(brand, model, maxTank, typeFuel = 'petrol') {
    super(brand, model.maxTank);
    this.typeFuel = typeFuel;
  };
}

class Truck extends Car1 {
  typeCar = 'Truck';

  constructor(brand, model, maxTank, typeFuel = 'diesel') {
    super(brand, model, maxTank);
    this.typeFuel = typeFuel;
  }
}



// переписать на модули
// import './style.css';



const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
  passangerCar: [
    ['Opel', 'Crossland', 45],
    ['Opel', 'Grandland X', 53],
    ['Mazda', 'cx-5', 55],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X5d', 80, 'diesel'],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
  ],
  truck: [
    ['MAN', 'TGS', 400],
    ['MAN', 'TGX', 300],
    ['Mercedes-Benz', 'Actros', 450],
    ['Mercedes-Benz', 'Actros L', 650],
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700],
    ['Volvo', 'FMX', 540],
  ],
};

const getTestCar = () => {
  const typeBool = Math.random() < 0.6;
  const listCar = typeBool ? testArray.passangerCar : testArray.truck;
  const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
  return typeBool ? new PassangerCar(...randomCar) : new Truck(...randomCar);
};



const station = new Station([
  {
    type: 'petrol',
    count: 2,
    speed: 5,
  },
  {
    type: 'diesel',
    count: 1,
    speed: 10,
  }
]);

open.addEventListener('click', () => {
  station.init();
  console.log(station);
  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    station.addCarQueue(getTestCar());
  });
});


