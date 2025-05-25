import User from '../models/User';

const autoVaccinateJob = async () => {
  try {
    const now = new Date();
    const users = await User.find({
      vaccinationStatus: { $in: ['none', 'first_done'] }
    })
      .populate('firstDoseSlot')
      .populate('secondDoseSlot');

    for (const user of users) {
      if (user.vaccinationStatus === 'none' && user.firstDoseSlot) {
        const time = new Date(`${user.firstDoseSlot.date}T${user.firstDoseSlot.startTime}`);
        if (now >= time) {
          user.vaccinationStatus = 'first_done';
          await user.save();
        }
      }

      if (user.vaccinationStatus === 'first_done' && user.secondDoseSlot) {
        const time = new Date(`${user.secondDoseSlot.date}T${user.secondDoseSlot.startTime}`);
        if (now >= time) {
          user.vaccinationStatus = 'all_done';
          await user.save();
        }
      }
    }

    console.log(`[${new Date().toISOString()}] Auto vaccination update done.`);
  } catch (err) {
    console.error('Auto vaccinate job failed', err);
  }
};

export default autoVaccinateJob;