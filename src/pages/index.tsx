import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Charts } from '@/template/Charts';
import Shell from '@/template/Shell';
import { Stats } from '@/template/Stats';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => (
  <>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Shell title="Dashboard">
      <Section>
        <Stats />
      </Section>

      <Section>
        <Charts />
      </Section>
    </Shell>
  </>
);

export default Index;
