import { ComponentStory, Meta } from '@storybook/react';
import IconComponent, {IconComponentProps} from './IconComponent';

const stub = [
    { id: "copy", label: "Copy", className: "icon tall copy" },
    { id: "paste", label: "Paste", className: "icon tall paste" },
    { id: "delete", label: "Delete", className: "icon tall delete" },
 ]

export default {
    title: 'Components/Icon',
    component: IconComponent
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof IconComponent> = (args) => <IconComponent {...args} />;

export const Default = Template.bind({});
Default.args = { id: "copy", label: "Copy", className: "icon tall copy" }
Default.storyName = 'Icon';