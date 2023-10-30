export default class Extrapolation {

  protected solveLinearSystem(A: number[][], B: number[]) {
    // Forward elimination
    for (let i = 0; i < A.length; i++) {
      // Find the pivot row
      let pivotRow = i;
      for (let j = i + 1; j < A.length; j++) {
        if (Math.abs(A[j][i]) > Math.abs(A[pivotRow][i])) {
          pivotRow = j;
        }
      }

      // Swap the rows
      [A[i], A[pivotRow]] = [A[pivotRow], A[i]];
      [B[i], B[pivotRow]] = [B[pivotRow], B[i]];

      // Normalize the pivot row
      const pivot = A[i][i];
      for (let j = i; j < A.length; j++) {
        A[i][j] /= pivot;
      }
      B[i] /= pivot;

      // Eliminate the other rows
      for (let j = 0; j < A.length; j++) {
        if (j !== i) {
          const factor = A[j][i];
          for (let k = i; k < A.length; k++) {
            A[j][k] -= factor * A[i][k];
          }
          B[j] -= factor * B[i];
        }
      }
    }

    // Backward substitution
    const x = new Array(A.length).fill(0);
    for (let i = A.length - 1; i >= 0; i--) {
      x[i] = B[i];
      for (let j = i + 1; j < A.length; j++) {
        x[i] -= A[i][j] * x[j];
      }
    }

    return x;
  }
}
