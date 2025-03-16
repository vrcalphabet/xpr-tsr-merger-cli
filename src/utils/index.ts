export function eraseUp(): void {
  console.log('\u001B[2K\u001B[1A'.repeat(2));
}

export function wait(ms: number = 1000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
