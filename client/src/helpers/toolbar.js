import RichTextEditor from 'react-rte';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import templates from './template.json';

const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS','BLOCK_TYPE_BUTTONS','BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS','TEMPLATES'],
    INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Strikethrough', style: 'STRIKETHROUGH' },
        { label: 'Monospace', style: 'CODE' },
        { label: 'Underline', style: 'UNDERLINE' },
    ],
    BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading Large', style: 'header-one' },
        { label: 'Heading Medium', style: 'header-two' },
        { label: 'Heading Small', style: 'header-three' },
        { label: 'Code Block', style: 'code-block' },
    ],
    BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
        { label: 'Blockquote', style: 'blockquote' },
    ]
};

const customControls=(setNote) => [
    () => {
        let value='placeholder';
        return <Select key='select'
        value={value}
        onChange={(e) => {
            value = e.target.value;
            setNote(RichTextEditor.createValueFromString(value, 'html'))
        }}
        style={{ marginLeft: 5}}
        >
            <MenuItem value={'placeholder'} disabled key={0}> Templates</MenuItem>
            <MenuItem value={templates.newClient} key={1}>New client details</MenuItem>
            <MenuItem value={templates.meetingMinutes} key={2}>Meeting notes</MenuItem>
        </Select >
    }
]

const toolbarCustomization = { toolbarConfig, customControls };

export default toolbarCustomization;