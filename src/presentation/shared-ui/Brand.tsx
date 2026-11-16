import Link from "next/link";
import styles from "./brand.module.css";

/** O l continua tipográfico; a copa transforma sua haste em tronco. */
export function TreeL() {
  return (
    <span className={styles.tree}>
      l
      <svg viewBox="0 0 24 22" aria-hidden="true" focusable="false">
        <path
          d="M12 1C8 1 6 4 6 7c-5 0-7 7-3 10 2 2 6 2 9 0 3 2 7 2 9 0 4-3 2-10-3-10 0-3-2-6-6-6Z"
          fill="currentColor"
        />
        <path
          d="M12 21V11m0 6-4-4m4 2 4-4"
          fill="none"
          stroke="var(--color-page)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function BrandWordmark() {
  return (
    <span className={styles.wordmark} role="img" aria-label="meu plantio">
      <span aria-hidden="true">
        <span className={styles.meu}>meu</span>{" "}
        <span className={styles.plantio}>
          p<TreeL />
          antio
        </span>
      </span>
    </span>
  );
}

export function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <img
      className={styles.mark}
      src="/brands/meu-plantio.svg"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
    />
  );
}

export function Brand() {
  return (
    <Link href="/" className={styles.link} aria-label="Meu plantio, home">
      <BrandMark />
      <BrandWordmark />
    </Link>
  );
}
