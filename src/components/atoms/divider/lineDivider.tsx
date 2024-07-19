const LineDivider = ({ color }: { color?: string }) => {
    return (
        <div
            style={{
                width: '100%',
                height: '1px',
                background: `linear-gradient(90deg, ${color || '#383838'} 50%, transparent 50%) 0 0 / 8px 8px`
            }}
        />
    );
};

export default LineDivider;
