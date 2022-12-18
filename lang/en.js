export default async (context, locale) => {
    return await Promise.resolve({
        addToBag: 'Add to Bag',
        notes: 'Notes',
        total: 'Total',
        subtotal: 'Sub Total',
        taxes: 'Taxes',
        car_number: 'Car Number',
        bag_items: 'Bag Items',
        place_order: 'Place Order',

        // Order Status
        pending_title: 'Pending Confirmation',
        pending_description: 'Your order was sent to shop.',

        declined_title: 'Your order has been declined',
        declined_description: 'The shop did not accept your order. We aplogize for the trouble',

        confirmed_title: 'Preparing your Order',
        confirmed_description: 'The shop is preparing your order',

        ready_title: 'Ready',
        ready_description: 'Order on it\'s way to you!',

        completed_title: 'Completed!',
        completed_description: 'Thank You & See You again!',
        
        // Feedbacks
        write_feedback: 'Write a Feedback',
        name: 'Name',
        email: 'Email',
        feedback: 'Feedback',
        submit: 'Submit',
        feedback_sent: 'Feedback sent'
      })
  }
  
 