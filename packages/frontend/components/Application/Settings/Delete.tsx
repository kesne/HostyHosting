import { Modal, Typography, Button } from 'antd';
import useBoolean from '../../utils/useBoolean';

export default function Delete() {
    const [visible, { on, off }] = useBoolean(false);

    function handleDelete() {
        return;
    }

    return (
        <>
            <Button type="danger" onClick={on}>
                Delete Application
            </Button>
            <Typography.Paragraph>Deleting the application can not be undone.</Typography.Paragraph>
            <Modal
                visible={visible}
                onOk={handleDelete}
                onCancel={off}
                title="Delete Application"
            >
                <Typography.Paragraph>
                    Are you sure that you want to delete this application? All containers in the
                    application will be immediately stopped. This can not be undone.
                </Typography.Paragraph>
            </Modal>
        </>
    );
}
