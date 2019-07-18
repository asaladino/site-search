import React from 'react';

const Excerpt = (props) => {
    let {text, phrases, radius, ending} = props;
    let append, prepend, phraseLen, pos, startPos, endPos, excerpt, textLen;

    let phrase = phrases[0];
    if (!text || !phrase) {
        return text;
    }

    radius = radius || '100';
    ending = ending || '...';

    append = prepend = ending;
    phraseLen = phrase.length;
    textLen = text.length;

    pos = text.toLowerCase().indexOf(phrase.toLowerCase());
    if (pos === false) {
        return text.substr(0, radius) + ending;
    }

    startPos = pos - radius;
    if (startPos <= 0) {
        startPos = 0;
        prepend = '';
    }

    endPos = pos + phraseLen + radius;
    if (endPos >= textLen) {
        endPos = textLen;
        append = '';
    }

    excerpt = text.substr(startPos, endPos - startPos);
    excerpt = prepend + excerpt + append;

    for (const p of phrases) {
        excerpt = excerpt.replace(p, `<span class="site-search-term label secondary">${p}</span>`)
    }

    return <div dangerouslySetInnerHTML={{__html: excerpt}} className='site-search-excerpt'/>;
};

export default Excerpt;