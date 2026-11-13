'use client';
// Re-export next/link from a Client Component so Server Components can pass it
// to MUI's `component` prop (e.g. <Button component={Link} href="/" />).
import Link from 'next/link';

export default Link;
