export interface MenuDataType {
  label: string
  link: string
}

export const rootOfEquation: MenuDataType[] = [
  { label: "Graphical Method", link: "/root/graphical-method" },
  { label: "Bisection Method", link: "/root/bisection-method" },
  { label: "False Position Method", link: "/root/false-position-method" },
  { label: "One-Point Iteration Method", link: "/root/one-point-iteration-method" },
  { label: "Newton-Raphson Method", link: "/root/newton-raphson-method" },
  { label: "Secant Method", link: "/root/secant-method" },
]

export const linearAlgebraEquation: MenuDataType[] = [
  { label: "Cramer's Rule", link: "/linear/cramer-rule" },
  { label: "Gauss Elimination", link: "/linear/gauss" },
  { label: "Gauss-Jordan Elimination", link: "/linear/gauss-jordan" },
  { label: "Matrix Inversion", link: "/linear/matrix-inversion" },
  { label: "LU Decomposition Method", link: "/linear/lu-decomposition" },
  { label: "Cholesky Decomposition Method", link: "/linear/cholesky" },
  { label: "Jacobi Iteration Method", link: "/linear/jacobi" },
  { label: "Gauss Seidel Iteration Method", link: "/linear/gauss-seidel" },
  { label: "Conjugate Gradient Method", link: "/linear/conjugate-gradient" },
]

export const interpolation: MenuDataType[] = [
  { label: "Newton Divided-Differences", link: "/interpolation/newton" },
  { label: "Lagrange Interpolation", link: "/interpolation/lagrange" },
  { label: "Spline Interpolation", link: "/interpolation/spline" },
]

export const leastSqaures: MenuDataType[] = [
  { label: "Regression", link: "/least-sqaures/regression" },
  { label: "Multiple Linear Regression", link: "/least-sqaures/multi-linear-regression" },
]

export const integration: MenuDataType[] = [
  { label: "Single Trapezoidal Rule", link: "/integration/single-trapezoidal" },
  { label: "Composite Trapezoidal Rule", link: "/integration/composite-trapezoidal" },
  { label: "Single Simpson's Rule", link: "/integration/single-simpson" },
  { label: "Composite Simpson's Rule", link: "/integration/composite-simpson" },
]

export const differentiation: MenuDataType[] = [
  { label: "Differential Equation", link: "/differentiation" },
]