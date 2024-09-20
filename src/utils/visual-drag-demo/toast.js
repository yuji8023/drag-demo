// import notify from 'devextreme/ui/notify';
import { message } from 'antd';

// The message's type: "info", "warning", "error" or "success".
export default function toast(msg = '', type = 'warning', duration = 1500) {
    message[tyoe](msg, duration)
    // notify({
    //     message,
    //     type,
    //     duration,
    // })
}