export default async (context, locale) => {
    return await Promise.resolve({
        addToBag: 'اضافة الى السلة',
        notes: 'ملاحضات',
        total: 'المجوع',
        subtotal: 'المجموع',
        taxes: 'الضريبة',
        car_number: 'رقم السيارة',
        bag_items: 'السلة',
        place_order: 'طلب',

        // Order Status
        pending_title: 'جاري الموافقة',
        pending_description: 'تم ارسال الطلب الى المتجر',

        declined_title: 'تم رفض الطلب',
        declined_description: 'تم رفض طلبك من المتجر',

        confirmed_title: 'جاري تجهير الطلب',
        confirmed_description: 'المتجر يجهز طلبك حاليا',

        ready_title: 'جاهز',
        ready_description: 'طلبك في طريقه اليك',

        completed_title: 'تم',
        completed_description: 'شكرا لكم',
        
        // Feedbacks
        write_feedback: 'تقييم المتجر',
        name: 'الاسم',
        email: 'البريد الالكتروني',
        feedback: 'التقييم',
        submit: 'ارسال',
        feedback_sent: 'تم ارسال تقييمك'
      })
  }
  
 