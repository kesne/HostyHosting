import React from 'react';
import { ContainerGroup as ContainerGroupData } from '../../../queries';
// import ScaleContainerGroup from './ScaleContainerGroup';
// import DeleteContainerGroup from './DeleteContainerGroup';
import { ListItem } from '@daas/ui/List';

type Props = {
    // TODO: This type is subtly wrong:
    containerGroup: Pick<
        ContainerGroupData,
        'id' | 'size' | 'containerCount' | 'label' | 'deployment'
    >;
};

export default function Container({ containerGroup }: Props) {
    return (
        <ListItem to="#">
            <div className="flex justify-between">
                <span className="text-indigo-700 text-lg">{containerGroup.label}</span>
                {/* <ScaleContainerGroup
                    id={containerGroup.id}
                    currentNumber={containerGroup.containerCount}
                /> */}
            </div>

            {/* <Tag>
                {containerGroup.size} CPU Unit, {containerGroup.size * 128} MB
            </Tag> */}

            {/* <Descriptions size="small">
                <Descriptions.Item label="Size">
                    <Typography.Text code>{containerGroup.size}x</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Number of Containers">
                    <Typography.Text code>{containerGroup.containerCount}</Typography.Text>
                </Descriptions.Item>
                <Descriptions.Item label="Deployment">
                    <Typography.Text code>{containerGroup.deployment?.image}</Typography.Text>
                </Descriptions.Item>
            </Descriptions> */}

            {/* <DeleteContainerGroup id={containerGroup.id} /> */}
        </ListItem>
    );
}
