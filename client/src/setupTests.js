import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// react router needs these in the tests
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;