import { Chart1 } from '@/components/charts/Chart1';
import { Chart2 } from '@/components/charts/Chart2';
import { Chart3 } from '@/components/charts/Chart3';
import { Chart4 } from '@/components/charts/Chart4';
import { useMoods } from '@/hooks/useMoods';

const Charts = () => {
  const { moods } = useMoods();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-6">
        <Chart1 moods={moods} />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <Chart2 moods={moods} />
      </div>
      <div className="col-span-12 lg:col-span-8">
        <Chart3 moods={moods} />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <Chart4 moods={moods} />
      </div>
    </div>
  );
};

export { Charts };
