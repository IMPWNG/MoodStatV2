import { Chart1 } from './Chart1';
import { Chart2 } from './Chart2';
import { Chart3 } from './Chart3';
import { Chart4 } from './Chart4';

const Charts = () => (
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 lg:col-span-6">
      <Chart1 />
    </div>
    <div className="col-span-12 lg:col-span-6">
      <Chart2 />
    </div>
    <div className="col-span-12 lg:col-span-8">
      <Chart3 />
    </div>
    <div className="col-span-12 lg:col-span-4">
      <Chart4 />
    </div>
  </div>
);

export { Charts };
