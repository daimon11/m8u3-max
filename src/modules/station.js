import { Column } from './column';
import { RenderStation } from './renderStation';

export class Station {
    #queue = [];
    #filling = [];
    #ready = [];
    constructor(typeStation = {
        type: 'diesel',
        count: 1,
        speed: 5,
    }, renderApp = null) {
        this.typeStation = typeStation;
        this.renderApp = renderApp;
        this.renderStation = null;
    };

    get filling() {
        return this.#filling;
    };

    get queue() {
        return this.#queue;
    };

    renderStart() {
        for (const optionStation of this.typeStation) {
            for (let i = 0; i < optionStation.count; i++) {
                console.log(optionStation.count);
                this.#filling.push(new Column(optionStation.type, optionStation.speed))
            }
        };

        if (this.renderApp) {
            this.renderStation = new RenderStation(this.renderApp, this);
        };

        setInterval(() => {
            this.checkQueueToFilling();
        }, 2000);
    };

    init() {
        this.typeStation.length > 1 ? this.renderStart() : this.#filling.push(new Column(this.typeStation.type, this.typeStation.spped))

    };

    checkQueueToFilling() {
        if (this.#queue.length) {
            for (let i = 0; i < this.#queue.length; i++) {
                for (let k = 0; k < this.#filling.length; k++) {
                    if (!this.#filling[k].car && this.#queue[i].typeFuel === this.#filling[k].type) {
                        this.#filling[k].car = this.#queue.splice(i, 1)[0];
                        this.fillingGo(this.#filling[k]);
                        this.renderStation.renderStation();
                        break;
                    }
                }
            }
        }
    };

    fillingGo(column) {
        const car = column.car;
        console.log('fillingGo(column)', car);
        const needPetrol = car.needPetrol;
        let nowTank = car.nowTank;
        const timerId = setInterval(() => {
            console.log(car.getTitle(), nowTank);
            nowTank += column.speed;
            if (nowTank >= car.maxTank) {
                clearInterval(timerId);
                const total = car.nowTank - needPetrol;
                car.fillUp();
                column.car = null;
                this.leaveClient({ car, total });
            }
        }, 1000);
    };

    leaveClient({ car, total }) {
        this.#ready.push(car);
        console.log(car.getTitle(), total);
        this.renderStation.renderStation();
    };

    addCarQueue(car) {
        this.#queue.push(car);
    };
}