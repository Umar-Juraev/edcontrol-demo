import React, { useEffect } from 'react';

import MessageHistoryTable from 'pages/Settings/_components/MessageHistory/MessageHistoryTable';


export type Props = {};

const MessageHistory = (props: Props) => {

    return (
        <div>
            <MessageHistoryTable />
        </div>
    );
}

export default MessageHistory;