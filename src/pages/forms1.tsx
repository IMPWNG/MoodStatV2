import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Form1 } from '@/template/Form1';
import Shell from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => (
  <>
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Shell title="Ai - Resume">
      <Section>
        <Form1 />
      </Section>
    </Shell>
  </>
);

export default Index;
