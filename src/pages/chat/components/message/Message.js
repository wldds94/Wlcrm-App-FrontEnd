// import "./message.scss";

// react redux
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "store/reducers/chat";

// utils
import { getUserFullName } from "utils/app/user";

// project import
import {BackgroundLetterAvatars} from "components/avatar/CustomAvatar";

// assets
import DeleteIcon from '@mui/icons-material/Delete';

export default function Message({ message, own, user, ...other }) {
    const dispatch = useDispatch()
    // console.log(message, own); // const meta = user?.meta ? user.meta : false; console.log(user);
    const name = user ? getUserFullName(user, false) : ""

    const isDeleted = Boolean(message?.deleted)

    const handleDelete = async (e) => {
        e.preventDefault()
        try {
            console.log('Success');
            // const resultAction = await dispatch(saveMessage(values)).unwrap()
            const deleteRes = await dispatch(deleteMessage({ messageID: message.id }))
            
        } catch (err) {
            console.log('Failed');

            // setStatus({ success: false });
            // setErrors({ submit: err.message });
            // setSubmitting(false);
        }
    }

    return (
        <div className={own ? "message own" : "message"} style={{ opacity: isDeleted ? ".6" : "1" }} >
            <div className="messageTop">
                <div>
                    {<BackgroundLetterAvatars name={!isDeleted ? name : ""} />}
                </div>
                <div className="messageText">
                    {(Boolean(own) && !isDeleted) && <div className="delete">
                        <DeleteIcon fontSize=".85rem" color="secondary" onClick={handleDelete} />
                    </div>}
                    {!isDeleted && <div className="messageAuthor">{name}</div>}
                    <p>{!isDeleted ? message.text : "Questo messaggio è stato eliminato"}</p>
                </div>
            </div>
            {!isDeleted && <div className="messageBottom">{message.createdAt}</div>}
        </div>
    );
}