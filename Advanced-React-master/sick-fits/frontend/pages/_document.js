// this file allows us to edit header element above the body
import Document, {Html, Head, NextScript, Main} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang ="en-CA">
                <body>
                    <Main/>
                </body>
            </Html>
        )
    }
}