import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import Shell from '@/template/Shell';
import { Table } from '@/template/Table';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => (
  <>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Shell title="Data">
      <Section>
        <Table />
      </Section>
    </Shell>
  </>
);

export default Index;
