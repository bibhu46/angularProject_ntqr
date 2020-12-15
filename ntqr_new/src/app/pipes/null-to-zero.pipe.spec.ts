import { NullToZeroPipe } from './null-to-zero.pipe';

describe('NullToZeroPipe', () => {
  it('create an instance', () => {
    const pipe = new NullToZeroPipe();
    expect(pipe).toBeTruthy();
  });
});
