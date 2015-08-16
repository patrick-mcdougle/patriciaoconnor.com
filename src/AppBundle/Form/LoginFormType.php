<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class LoginFormType extends AbstractType
{
    /**
     * @var AuthenticationUtils
     */
    private $authenticationUtils;

    /**
     * @var RouterInterface
     */
    private $router;

    public function __construct(
        AuthenticationUtils $authenticationUtils,
        RouterInterface $router
    ) {
        $this->authenticationUtils = $authenticationUtils;
        $this->router = $router;
    }

    public function buildForm(FormBuilderInterface $formBuilder, array $options = [])
    {
        $formBuilder
            ->add('username', 'text', ['data' => $this->authenticationUtils->getLastUsername(),])
            ->add('password', 'password')
            ->add('save', 'submit')
            ->addEventListener(FormEvents::PRE_SET_DATA, function(FormEvent $event) {
                $form = $event->getForm();
                if (!empty($error = $this->authenticationUtils->getLastAuthenticationError())) {
                    $form->addError(new FormError($error->getMessage()));
                }
            })
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefault('action', $this->router->generate('login_check'));
    }

    /**
     * @inheritDoc
     */
    public function getName()
    {
        return 'login_form';
    }
}
