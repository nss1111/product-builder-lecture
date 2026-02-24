class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .lotto-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 1rem;
                    padding: 1rem;
                }
                .lotto-ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: white;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
                    transform: scale(0);
                    animation: pop-in 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
                }

                @keyframes pop-in {
                    to {
                        transform: scale(1);
                    }
                }
            </style>
            <div class="lotto-container"></div>
        `;
    }

    generateNumbers() {
        const lottoContainer = this.shadowRoot.querySelector('.lotto-container');
        lottoContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        Array.from(numbers).sort((a, b) => a - b).forEach((number, index) => {
            const ball = document.createElement('div');
            ball.className = 'lotto-ball';
            ball.textContent = number;
            ball.style.backgroundColor = this.getColor(number);
            ball.style.animationDelay = `${index * 0.1}s`;
            lottoContainer.appendChild(ball);
        });
    }

    getColor(number) {
        if (number <= 10) return '#fbc400';      // Yellow
        if (number <= 20) return '#69c8f2';      // Blue
        if (number <= 30) return '#ff7272';      // Red
        if (number <= 40) return '#aaaaaa';      // Gray
        return '#b0d840';                       // Green
    }
}

customElements.define('lotto-numbers', LottoNumbers);

document.getElementById('generate-btn').addEventListener('click', () => {
    document.querySelector('lotto-numbers').generateNumbers();
});
