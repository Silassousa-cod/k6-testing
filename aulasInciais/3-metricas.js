//Adicionando métricas
import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';
import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';


export const options = {
    vus: 1,
    duration: '3s'
}

const meuCounter = new Counter ('conta das qtd de chamadas');
const meuGauge = new Gauge ('Tempo bloqueado');
const meuRate = new Rate ('taxa de req 200')
const meuTrend = new Trend('tendencia de espera')

export default function () {
    const req = http.get('http://test.k6.io')
    meuCounter.add(1); //Verifica quantidade de chamadas
    meuGauge.add(req.timings.blocked); //Acessa o tempo de bloqueio
    meuRate.add(req.status === 200); //Verifica a taxa de req que deram 200
    meuTrend.add(req.timings.waiting); //quanto tempo a req esperou para ser realizada
    }

