import styles from "./bonus.module.scss";

const Bonus = () => {
  return (
    <For of={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} index="index">
      <div className={styles.bonus} key={index}>
        <span className={styles.text}>{index + 1}.登记达到80级</span>
        <span className={styles.amount}>
          + <em>0.5</em>
        </span>
      </div>
    </For>
  );
};

export default Bonus;
