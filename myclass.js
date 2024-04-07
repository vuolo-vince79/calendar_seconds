export default class ModalDateTime{
    constructor(id){
        this.id = id;
    }

    renderCalendar(){
        const container = document.getElementById(this.id);
        
        container.innerHTML = `
        <div id="calendar">
        <div class="container">
        <div class="title"></div>
        <div class="dsp-flex">
        <div class="datetime-btn">Lun</div>
        <div class="datetime-btn">Mar</div>
        <div class="datetime-btn">Mer</div>
        <div class="datetime-btn">Gio</div>
        <div class="datetime-btn">Ven</div>
        <div class="datetime-btn">Sab</div>
        <div class="datetime-btn">Dom</div>
        </div>
        <div id="giorni"></div>
        </div>
        <div id="ore"></div>
        <div id="minuti"></div>
        <div id="secondi"></div>
        </div>
        <div id="input"></div>
        <div id="date-png"></div>    
        `;
        const calendar = document.getElementById('calendar');
        const input = document.getElementById('input');
        const giorni = document.getElementById('giorni');
        const ore = document.getElementById('ore');
        const minuti = document.getElementById('minuti');
        const secondi = document.getElementById('secondi');
        const png = document.getElementById('date-png');
        
        document.addEventListener('DOMContentLoaded', () => {
            input.textContent = formatDate(new Date());
        });
        
        document.addEventListener('click', (e) => {
            if(!calendar.contains(e.target) && e.target.id !== "date-png" ){
                calendar.style.display = "none";
            }
        });
        
        document.getElementById('date-png').addEventListener('click', (e) => {
                cleanContainers(giorni, ore, minuti, secondi);
                createCalendar(new Date(input.textContent));
                calendar.style.top = 30 + "px";
                calendar.style.left = 0;
                calendar.style.display = "flex";
        });
        
        function cleanContainers(...params){
            for(const param of params)
                while(param.firstChild)
                    param.removeChild(param.firstChild);
        }
        
        function createCalendar(date){
            createDate(date);
            setTimeout(() => {
                const altezza = calendar.querySelector('.container').offsetHeight;
                calendar.style.height = altezza + "px";
                createHours(date);
                createMinuteSecond(date);
            }, 20);
            giorni.addEventListener('click', (e) => {
                if(e.target.classList.contains('num-date')){
                    date.setDate(e.target.textContent);
                    input.textContent = formatDate(date);
                }
            });
            ore.addEventListener('click', (e) => {
                if(e.target.classList.contains('datetime-btn')){
                    date.setHours(e.target.textContent);
                    input.textContent = formatDate(date);
                }
            });
            minuti.addEventListener('click', (e) => {
                if(e.target.classList.contains('datetime-btn')){
                    date.setMinutes(e.target.textContent);
                    input.textContent = formatDate(date);
                }
            });
            secondi.addEventListener('click', (e) => {
                if(e.target.classList.contains('datetime-btn')){
                    date.setSeconds(e.target.textContent);
                    input.textContent = formatDate(date);
                }
            });
        }
        
        function lastDayOfMonth(date){
            return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        }
        
        function indexDay(date){
            const index = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
            if(index == 0) return 6;
            return index - 1;
        }
        
        function formatDate(date){
            return date.toLocaleString("it-IT", {
                dateStyle : 'medium',
                timeStyle : 'medium'
            }).replace(",", "");
        }
        
        function createDate(date){
            const fragmentGiorni = document.createDocumentFragment();
            for(let i = 0; i < indexDay(date); i++){
                const div = document.createElement('div');
                div.classList.add('datetime-btn');
                fragmentGiorni.appendChild(div);
            }
            for(let i = 1; i <= lastDayOfMonth(date); i++){
                const div = document.createElement('div');
                div.classList.add('datetime-btn', 'num-date');
                div.textContent = i;
                if(date.getDate() === i){
                    div.style.backgroundColor = "blue";
                }
                fragmentGiorni.appendChild(div);
            }
            giorni.appendChild(fragmentGiorni);
            calendar.children[0].querySelector('.title').textContent = date.toLocaleString("en-EN", {month : 'long', year : 'numeric'});
        }
        
        function createHours(date){
            const fragment_hours = document.createDocumentFragment()
            for(let i = 0; i < 24; i++){
                const div = document.createElement('div');
                div.classList.add('datetime-btn');
                div.textContent = i < 10 ? `0${i}` : i;
                btnChecked(div, date.getHours(), i);
                fragment_hours.appendChild(div);
            }
            ore.appendChild(fragment_hours);
        }
        
        function createMinuteSecond(date){
            const fragment_minutes = document.createDocumentFragment();
            const fragment_seconds = document.createDocumentFragment()
            for(let i = 0; i < 60; i++){
                const minutes_div = document.createElement('div');
                const seconds_div = document.createElement('div');
                minutes_div.classList.add('datetime-btn');
                seconds_div.classList.add('datetime-btn');
                minutes_div.textContent = i < 10 ? `0${i}` : i;;
                seconds_div.textContent = i < 10 ? `0${i}` : i;;
                btnChecked(minutes_div, date.getMinutes(), i);
                btnChecked(seconds_div, date.getSeconds(), i);
                fragment_minutes.appendChild(minutes_div);
                fragment_seconds.appendChild(seconds_div);
            }
            minuti.appendChild(fragment_minutes);
            secondi.appendChild(fragment_seconds);
        }
        
        function btnChecked(element, datetime, index){
            if(datetime == index){
                element.style.backgroundColor = "blue";
                setTimeout(() => {
                    element.scrollIntoView({behavior : 'smooth', block : 'start'});
                }, 50);
            }
        }
        
    }

    applyStyle(){
        const style = document.createElement('style');
        style.innerHTML = `
            #${this.id}{
                width: 200px;
                padding: 5px;
                display: flex;
                justify-content: space-between;
                align-items: start;
                background-color: aqua;
                position: relative;
            }
            
            #date-png{
                width: 20px;
                height: 20px;
                background-image:`
                +"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC"
                +"/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZ"
                +"iS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAABWZJREFUWMPFl8uPXEcVxn91762+07df091x7"
                +"LGHGTvGeSBFSoAoiEWEI5I1bHGkCJRkwS5SEAv+hUiRwhaCgLC2RISEkIxFkg0KwpmMETJmkkyw"
                +"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');background-size: cover;}"
            +`    
            
            #calendar{
                display: none;
                justify-content: space-between;
                align-items: center;
                column-gap: 20px;
                width: max-content;
                background-color: aqua;
                position: absolute;
            }
            
            .container{
                display: flex;
                flex-direction: column;
            }
            
            .container .title{
                background-color: red;
                color: yellow;
                text-align: center;
                padding-block: 20px;
            }
            
            .datetime-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 30px;
                color: white;
                background-color: black;
                border: 1px solid white;
            }
            
            .datetime-btn:hover{
                background-color: white;
                color: black;
            }
            
            #giorni{
                width: 280px;
                display: flex;
                flex-wrap: wrap;
            }
            
            #ore, #minuti, #secondi{
                height: 100%;
                overflow: scroll;
                scrollbar-width: none;
                scroll-behavior: smooth;
            }
            
            .dsp-flex{
                display: flex;
            }
        `;
        document.head.appendChild(style);
    }

}


