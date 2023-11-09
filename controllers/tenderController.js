import TenderModel from "../model/tenderModel.js";

export const create = async (req, res) => {
  try {
    const doc = new TenderModel({
      title: req.body.title,
      text: req.body.text,
      price: req.body.price,
    });

    const tender = await doc.save();

    // Генеруємо код формату
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
    const day = new Date().getDate().toString().padStart(2, "0");
    const count = await TenderModel.countDocuments();
    const objectId = count + 1;

    // Форматуємо код і додаємо його до об'єкта тендера
    const code = `UA-P-${year}-${month}-${day}-00000${objectId}-a`;

    // Додаємо код формату до об'єкта тендера
    tender.code = code;

    // Зберігаємо об'єкт тендера з кодом формату
    const updatedTender = await tender.save();

    res.json(updatedTender);
  } catch (error) {
    res.status(500).json({
      message: "Помилка створення",
    });
    console.log(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const tenders = [];
    let tendersData = await TenderModel.find().populate("tender").exec();

    for (let tender of tendersData) {
      tenders.push({
        _id: tender._id,
        title: tender.title,
        text: tender.text,
        price: tender.price,
        code: tender.code,
        createdAt: post.createdAt.toLocaleString(),
        updatedAt: post.updatedAt.toLocaleString(),
      });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Статті не знайдено",
    });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    // Знаходимо тендер за його id
    const tender = await TenderModel.findById(id);

    // Перевіряємо, чи тендер був знайдений
    if (!tender) {
      return res.status(404).json({ message: "Тендер не знайдено" });
    }

    res.json(tender);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Помилка при знаходженні тендера за id",
    });
  }
};
