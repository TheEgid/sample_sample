# sample_sample

// .ant-layout {

.ant-layout-content {
    margin-left: calc(1vw * 8); /* Отступ слева 1/16 ширины экрана */
    margin-right: calc(1vw * 8); /* Отступ справа 1/16 ширины экрана */
    max-width: calc(100% - calc(1vw * 16)); /* Учет margin в ширине */
    padding: 0;
    background: #fff;
}

@media (max-width: 768px) {
    .ant-layout-content {
        margin-left: 0; /* Убираем отступ слева */
        margin-right: 0; /* Убираем отступ справа */
        width: 100%; /* Ширина на всю доступную область */
        max-width: 100%; /* Сбрасываем max-width для мобильных */
    }
}

.main-main {
    display: flex;
    flex-direction: row;
    align-items: center;
}

%common-item {
    display: flex;
    margin: 3px;
    width: auto;
    height: 300px;
    flex-grow: 1; // Базовый flex-grow
}

.item1 {
    @extend %common-item;
    background-color: rgb(228, 86, 70);
}

.item2 {
    @extend %common-item;
    flex-grow: 9; // Уникальный flex-grow
    background-color: rgb(138, 105, 255);
}

// Медиазапрос для мобильных устройств
@media (max-width: 768px) {
    .item1, .item2 {
        margin: 1px; // Уменьшенный отступ
    }
}
@media (max-width: 768px) {
    .item1, .item2 {
        margin: 1px;
    }
}
