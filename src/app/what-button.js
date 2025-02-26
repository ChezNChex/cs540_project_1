'use client'

import { useState } from 'react';

export default function WhatButton() {
    const [whats, setWhats] = useState(0);
    function handleClick() {
        setWhats(whats + 1);
    }
    return <button onClick={handleClick}>what ({whats})</button>;
}
